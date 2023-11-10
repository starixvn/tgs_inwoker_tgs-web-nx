import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetNavItemList } from "@/layouts/components/MenuDrawer/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import { useHeader } from "@/core/feature/useHeader";
import { NavItem } from "@/hooks/account/useAccountNavigations";
import promotionIcon from "@/assets/t24/images/menuDrawer/icon-promotion.svg";
import i18n from "@/utils/i18n";
import { useRwd } from "@/core/hooks/tools/useRwd";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuDrawerListContainer,
  MenuDrawerListGroup,
  MenuRow,
  MenuRowLabel,
} from "@/layouts/components/MenuDrawer/components/styled-components";

const MenuDrawerList = () => {
  const { gameTypeNavItemList, accountNavItemList } = useGetNavItemList();
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const initGameTypeNavIsOpen = history.location.pathname === "/";

  const [isGameTypeNavOpen, setIsGameTypeNavOpen] = useState(initGameTypeNavIsOpen);
  const [isAccountNavOpen, setIsAccountNavOpen] = useState(!initGameTypeNavIsOpen);

  const handleAfterClick = () => {
    if (!(!isDesktopSize && isMenuOpen)) return;
    handleToggleMenu(false);
  };

  const toggleGameTypeNavAccordion = () => {
    setIsGameTypeNavOpen((prevState) => {
      // if you want to open gameTypeNav
      if (!prevState) {
        setIsAccountNavOpen(false);
      }
      return !prevState;
    });
  };

  const toggleAccountNavAccordion = () => {
    setIsAccountNavOpen((prevState) => {
      // if you want to open accountNav
      if (!prevState) {
        setIsGameTypeNavOpen(false);
      }
      return !prevState;
    });
  };

  const handleGameTypeNavClick = (navItem: NavItem) => {
    if (navItem.navType === "action") {
      navItem.callback();
    }
    handleAfterClick();
  };

  const handleAccountNavClick = (navItem: NavItem) => {
    if (navItem.navType === "route") {
      history.push(navItem.routePath);
    }
    handleAfterClick();
  };

  const goToPromotion = () => {
    history.push("/promotion-list");
    handleAfterClick();
  };

  return (
    <MenuDrawerListContainer>
      <MenuDrawerListGroup>
        <MenuRow onClick={() => goToPromotion()}>
          <Icon iconUrl={promotionIcon} width={"24px"} height={"24px"} />
          <MenuRowLabel>{isMenuOpen && <span>{i18n.t("common.promotion")}</span>}</MenuRowLabel>
        </MenuRow>
      </MenuDrawerListGroup>

      <MenuDrawerListGroup>
        <Accordion expanded={isGameTypeNavOpen} onChange={toggleGameTypeNavAccordion}>
          {isMenuOpen && <AccordionSummary expandIcon={<ExpandMoreIcon />}>Game</AccordionSummary>}

          <AccordionDetails>
            {gameTypeNavItemList.map((navItem) => {
              const { key, iconUrl, label } = navItem;
              return (
                <MenuRow key={key} onClick={() => handleGameTypeNavClick(navItem)}>
                  <Icon iconUrl={iconUrl} width={"24px"} height={"24px"} />
                  <MenuRowLabel>{isMenuOpen && <span>{label}</span>}</MenuRowLabel>
                </MenuRow>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </MenuDrawerListGroup>

      <MenuDrawerListGroup>
        <Accordion expanded={isAccountNavOpen} onChange={toggleAccountNavAccordion}>
          {isMenuOpen && (
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Account</AccordionSummary>
          )}

          <AccordionDetails>
            {accountNavItemList.map((navItem) => {
              const { key, iconUrl, label } = navItem;
              return (
                <MenuRow key={key} onClick={() => handleAccountNavClick(navItem)}>
                  <Icon iconUrl={iconUrl} width={"24px"} height={"24px"} />
                  <MenuRowLabel>{isMenuOpen && <span>{label}</span>}</MenuRowLabel>
                </MenuRow>
              );
            })}
          </AccordionDetails>
        </Accordion>
      </MenuDrawerListGroup>
    </MenuDrawerListContainer>
  );
};

export default MenuDrawerList;
