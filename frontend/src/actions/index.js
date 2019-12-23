export const SET_DOWNLOAD_FOLDER = 'set_download_folder';
export const SET_CLIENT = 'set_client';

export function setDownloadFolder(folder) {
  return {
    type: SET_DOWNLOAD_FOLDER,
    folder
  }
}

export function setClient(client) {
  return {
    type: SET_CLIENT,
    client
  }
}

