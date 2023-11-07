

function getAuthToken() {
    const url = `${properties.base_url}/tenants/${properties.tenant_id}/oauth2/token`
    const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            client_id: properties.client_id,
            client_secret: properties.client_secret,
            grant_type: "password",
            username: properties.username,
            password: properties.password
        })
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error("Error: ", error))
  }

  function handleFile(event) {
    setFile(event.target.files[0])
  }
 
  function handleUpload() {
    setCapFileIdPlaceholder("Processing...")
    
    const url = `${properties.base_url}/capture/cp-rest/v2/session/files`
    const fetchOptions = {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/hal+json",
        'Accept-Language': "en-US",
        'Content-Type': file.type,
        'Content-Length': file.size
      },
      body: file
    }

    fetch(url, fetchOptions)
      .then(response => response.json())
      .then(data => setCapturedFileId(data.id))
      .catch(error => console.error("Error: ", error))
  }

  function createSearchablePDF() {
    setOcrRespIdPlaceholder("Processing...")
    const pdfFileName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name
    const url = `${properties.base_url}/capture/cp-rest/v2/session/services/fullpageocr`
    const fetchOptions = {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/hal+json",
        'Accept-Language': "en-US",
        'Content-Type': "application/hal+json"
      },
      body: JSON.stringify({
        "serviceProps": [
          {"name": "Env","value": "D"},
          {"name": "OcrEngineName","value": "Advanced"}
          ],
        "requestItems": [
          {"nodeId": 1,"values": [
              {"name": "OutputType", "value": "pdf"}
            ],
            "files": [
              {"name": `${pdfFileName}`,
                "value": `${capturedFileId}`,
                "contentType": `${file.type}`
              }
            ]
          }
        ]
      })
    }
  
    fetch(url, fetchOptions)
      .then(response => response.json())
      .then(data => setOCRResponse(data))
      .catch(error => console.error("Error: ", error))
  }
  
  async function retrieveFileFromCaptureService() {
    setRetrieveStatus("Processing...")
    const captureUrl = `${properties.base_url}/capture/cp-rest/v2/session/files/${ocrResponse.resultItems[0].files[0].value}`
    const captureFetchOptions = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': ocrResponse.resultItems[0].files[0].contentType
      }
    }

    const response = await fetch(captureUrl, captureFetchOptions)
    const blob = await response.blob()
    setPdfFile(blob)
    setRetrieveStatus("...Retrieved "+blob.size+" bytes")
  }

  async function uploadFileToCSS() {
    setUploadedFileIdPlaceholder("Processing...")

    const cssUrl =`${properties.css_url}/v2/tenant/${properties.tenant_id}/content`
    const cssFetchOptions = {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/hal+json",
        'Content-Type': pdfFile.type,
        'Content-Length': pdfFile.size 
      },
      body: pdfFile
    }

    const response = await fetch(cssUrl, cssFetchOptions)
    const data =  await response.json()
    setUploadedFile(data.entries[0])
  }

  function getFolderName(event) {
    setFolderName(event.target.value)
    setFolderId("")
  }

  async function createFolder() {
    if (!folderName){
      alert("Please enter a folder name")
      return
    }

    const url = `${properties.base_url}/cms/instances/folder/cms_folder?include-total=true&filter=name%20eq%20%27${folderName}%27`

    const fetchOptions = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/hal+json"
      }
    }

    const response = await fetch(url, fetchOptions)
    const data = await response.json()
    
    if (data.total > 0) {
      console.log("Folder already exists")
      setFolderId(data._embedded.collection[0].id)
    }

    else {
      console.log("Creating a new folder")

      const url2 = `${properties.base_url}/cms/instances/folder/cms_folder`
      const fetchOptions2 = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json', 
            'accept': 'application/hal+json'
          },
          body: JSON.stringify({
            "name": folderName,
            "display_name": folderName,
            "description": "Folder created for demo",
            "type": "cms_folder"
          })
      }
  
      const response2 = await fetch(url2, fetchOptions2)
      const data2 = await response2.json()

      setFolderId(data2.id)
    }
  }

  async function createMetadataForFile() {
    if (!folderId){
      alert("Please create a folder before creating the file metadata")
      return
    }

    const pdfFileName = ocrResponse.resultItems[0].files[0].name + "." + ocrResponse.resultItems[0].files[0].fileType

    const url = `${properties.base_url}/cms/instances/file/cms_file?include-total=true&filter=name eq '${pdfFileName}' and parent_folder_id eq '${folderId}'&sortby=version_no asc`
    const fetchOptions = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/hal+json"
      }
    }

    const response = await fetch(url, fetchOptions)
    const data = await response.json()

    if (data.total > 0) {
      console.log("Metadata  already exists. # of existing versions =",data.total)

      const url2 = `${properties.base_url}/cms/instances/file/cms_file/${data._embedded.collection[data.total-1].id}/nextVersion`
      const fetchOptions2 = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/hal+json',
          'Content-Type': 'application/hal+json' 
        },
        body: JSON.stringify({
          "name": pdfFileName,
          "description": "PDF File created from OCR of uploaded image",
          "parent_folder_id": folderId,
          "renditions": [{
              "name": pdfFileName,
              "rendition_type": "primary",
              "blob_id": uploadedFile.id,
              "mime_type": uploadedFile.mimeType
            }]          
        })
      }

      const response2 = await fetch(url2, fetchOptions2)
      const data2 = await response2.json()
      console.log("Created version #",data2.version_no)
      setFileMetadata(data2)
    }

    else { 
      console.log("Metadata does not exists, creating a new one")

      const url2 = `${properties.base_url}/cms/instances/file/cms_file`
      const fetchOptions2 = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/hal+json',
          'Content-Type': 'application/hal+json' 
        },
        body: JSON.stringify({
          "name": pdfFileName,
          "description": "PDF File created from OCR of uploaded image",
          "parent_folder_id": folderId,
          "renditions": [{
              "name": pdfFileName,
              "rendition_type": "primary",
              "blob_id": uploadedFile.id,
              "mime_type": uploadedFile.mimeType
            }]
        })
      }

      const response2 = await fetch(url2, fetchOptions2)
      const data2 = await response2.json()
      setFileMetadata(data2)
    }
  }

  function retrieveFile() {
    const url =`${properties.css_url}/v2/content/${uploadedFile.id}/download?object-id=${fileMetadata.id}&file-name=${fileMetadata.name}&mime-type=${fileMetadata.mime_type}`

    const fetchOptions = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/octet-stream"
      }
    }

    fetch(url, fetchOptions)
      .then(response => response.blob())
      .then(blob => {
        const fileURL = URL.createObjectURL(blob)
        let alink = document.createElement('a')
        alink.href = fileURL
        alink.download = fileMetadata.name
        alink.click()
        URL.revokeObjectURL(fileURL)
      })
      .catch(error => console.error("Error: ", error))
  }