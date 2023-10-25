import { useContext, useState } from 'react';
import { RiArrowDropDownLine, RiCheckboxBlankCircleLine } from 'react-icons/ri';

import {
    ListSubheader,
    alpha,
    Box,
    List,
    styled,
    Button,
    ListItem
} from '@mui/material';

import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from './../context/SidebarContext';
import './style.css'
import * as FaIcons from 'react-icons/fa';
import { Image } from 'react-bootstrap';
import { FieldTimeOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const MenuWrapper = styled(Box)(
    ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
    ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
        'transform',
        'opacity'
    ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
    const { closeSidebar } = useContext(SidebarContext);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleSubMenuToggle = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <>

            <MenuWrapper>
                <List
                    component="div"
                    subheader={
                        <ListSubheader component="div" disableSticky>
                            Statistiques
                        </ListSubheader>
                    }
                >
                    <SubMenuWrapper>
                        <List component="div">
                            <ListItem component="div">
                                <Button
                                    disableRipple
                                    component={RouterLink}
                                    onClick={closeSidebar}
                                    to="/Admin/dashboard"
                                    startIcon={<FaIcons.FaChartLine />}
                                >
                                    Statistiques CA
                                </Button>
                            </ListItem>
                        </List>
                    </SubMenuWrapper>
                </List>

                <List
                    component="div"
                    subheader={
                        <ListSubheader component="div" disableSticky>
                            Admins
                        </ListSubheader>
                    }
                >
                    <SubMenuWrapper>
                        <List component="div">
                            <ListItem component="div">
                                <Button
                                    disableRipple
                                    component={RouterLink}
                                    onClick={closeSidebar}
                                    to="/Admin/Users"
                                    startIcon={<FaIcons.FaUsers />}
                                >
                                    Gestion des Admins
                                </Button>
                            </ListItem>
                        </List>
                    </SubMenuWrapper>
                </List>

                <List
                    component="div"
                    subheader={
                        <ListSubheader component="div" disableSticky>
                            Catégories
                        </ListSubheader>
                    }
                >
                    <SubMenuWrapper>
                        <List component="div">
                            <ListItem component="div">
                                <Button
                                    disableRipple
                                    component={RouterLink}
                                    onClick={closeSidebar}
                                    to="/Admin/categories"
                                    startIcon={<FaIcons.FaTasks />}
                                >
                                    Gestion des Categories
                                </Button>
                            </ListItem>
                        </List>
                    </SubMenuWrapper>
                </List>

                <List
                    component="div"
                    subheader={
                        <ListSubheader component="div" disableSticky>
                            Produits
                        </ListSubheader>
                    }
                >
                    <SubMenuWrapper>
                        <List component="div">
                            <ListItem component="div">
                                <Button
                                    disableRipple
                                    component={RouterLink}
                                    onClick={closeSidebar}
                                    to="/admin/produits"
                                    startIcon={<FaIcons.FaTasks />}
                                >
                                    Gestion des Produits
                                </Button>
                            </ListItem>
                        </List>
                    </SubMenuWrapper>
                </List>

                <List
                    component="div"
                    subheader={
                        <ListSubheader component="div" disableSticky>
                            Achats
                        </ListSubheader>
                    }
                >
                    <SubMenuWrapper>
                        <List component="div">
                            <ListItem component="div">
                                <Button
                                    disableRipple
                                    component={RouterLink}
                                    onClick={closeSidebar}
                                    to="/admin/commandes"
                                    startIcon={<FaIcons.FaCartPlus />}
                                >
                                    Commandes
                                </Button>
                            </ListItem>
                        </List>
                    </SubMenuWrapper>
                </List>
                <List
                    component="div"
                    subheader={
                        <ListSubheader component="div" disableSticky>
                            Test
                        </ListSubheader>
                    }
                >
                    <SubMenuWrapper>
                        <List component="div">
                            <ListItem component="div">
                                <div
                                    className="menu-item"
                                    onMouseEnter={handleSubMenuToggle}
                                    onMouseLeave={handleSubMenuToggle}
                                >
                                    <SettingOutlined />  <strong> Parameter</strong>
                                    {showSubMenu && <SubMenu />}
                                </div>
                            </ListItem>
                        </List>
                    </SubMenuWrapper>
                </List >
            </MenuWrapper >
        </>
    );
}

export default SidebarMenu;
const SubMenu = () => {
    return (
        <div className="sub-menu">
            <div className="sub-menu-item">
                <Link to="/admin/Working_hours" className="sub-menu-link">
                    <FieldTimeOutlined className="icon" />     Working time
                </Link>            </div>
            <div className="sub-menu-item">
                <RiCheckboxBlankCircleLine className="icon" /> Sub Item 2
            </div>
            <div className="sub-menu-item">
                <RiCheckboxBlankCircleLine className="icon" /> Sub Item 3
            </div>
        </div>
    );
};
