import ExplorerController from './ExplorerController'
import FolderController from './FolderController'


const Explorer = {
    ExplorerController: Object.assign(ExplorerController, ExplorerController),
    FolderController: Object.assign(FolderController, FolderController),
}

export default Explorer