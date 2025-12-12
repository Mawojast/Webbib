import DashboardController from './DashboardController'
import Settings from './Settings'
import PolController from './PolController'
import Explorer from './Explorer'
import SidebarController from './SidebarController'
import LinkController from './LinkController'
import UserFrontController from './UserFrontController'


const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    Settings: Object.assign(Settings, Settings),
    PolController: Object.assign(PolController, PolController),
    Explorer: Object.assign(Explorer, Explorer),
    SidebarController: Object.assign(SidebarController, SidebarController),
    LinkController: Object.assign(LinkController, LinkController),
    UserFrontController: Object.assign(UserFrontController, UserFrontController),
}

export default Controllers