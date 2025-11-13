import LinkController from './LinkController'
import ExplorerController from './ExplorerController'
import FolderController from './FolderController'


const Explorer = {
    LinkController: Object.assign(LinkController, LinkController),
    ExplorerController: Object.assign(ExplorerController, ExplorerController),
    FolderController: Object.assign(FolderController, FolderController),
}

export default Explorer