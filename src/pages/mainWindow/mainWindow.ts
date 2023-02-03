import { Component } from "../../components/components/components";
import { appendChildElements } from "../../utils/appendChild";
import { divMainWindow } from "./tmpls";
import { metaAttrButtonsMainWindow, metaAttrInputsMainWindow } from "./mainWindowMetaAttrs";
import { chats } from "../../utils/const";
import { generateChatItemList } from "../../utils/generateChatList";
import { openProfilePage } from "../profile/profile";
import { Button } from "../../components/button/button";
import { Input } from "../../components/inputObject/input";
import { ChatItem } from "../../components/chatItems/chatItem";
import { getModalWindow } from "../../components/modalWindow/modalWindow";
import { AddMenu } from "../../components/addMenu/addMenu";
import { getAddMenuButtons, getAddFilesMenu } from "../addMenu/addMenuAddFiles";
import { getChatMenuButtons, getChatMenu } from "../addMenu/addChatMenu";
// import { hideElement, showElement } from "../../utils/functions";


   

export function addMainWindow (idRootElement: string = "root"): void {
    let mainWindowHTML: HTMLlement = divMainWindow;
    appendChildElements(idRootElement, [mainWindowHTML]);
    const mainWinButtons: Button[] = [...metaAttrButtonsMainWindow()];
    const mainWininputs: Input[] = [...metaAttrInputsMainWindow()];
    let chatItems: ChatItem[] = [...generateChatItemList(chats)];
    const chatMenuButtons: Button[] = getChatMenuButtons();
    const chatAddMenuButtons: Button[] = getAddMenuButtons();
    const addMenuChatMenu: AddMenu = new AddMenu(getChatMenu());
    const addMenuAddchat: AddMenu = new AddMenu(getAddFilesMenu());

    
    //Добавляем кнопку профиль
    appendChildElements("chat-sidebar-header", [mainWinButtons[0].document()]);
    //добаляем инпут и кнопку поиска
    appendChildElements("search", [mainWininputs[0].document(), mainWinButtons[1].document()]);
    //Добаляем кнопки и инпут отправки сообщений
    appendChildElements("chat-input-form", [mainWinButtons[3].document(), mainWininputs[1].document(), mainWinButtons[4].document()]);
    //добавляем Кнопку меню чата
    appendChildElements("chat-header-descr", [mainWinButtons[2].document()]);
    //Добавляем список чатов
    appendChildElements("chat-sidebar-items", generateChatItemList(chats).map(item => item.document()));
    appendChildElements("root", [getModalWindow()]);

    
    //добавляем меню чата
    appendChildElements("dialog-footer", [addMenuChatMenu.document()]);
    appendChildElements("li_add-user", [chatMenuButtons[0].document()]);
    appendChildElements("li_delete-user", [chatMenuButtons[1].document()]);
    
    
    appendChildElements("root", [addMenuAddchat.document()]);
    //доабавляем меню добавления объектов в чат
    appendChildElements("li_add-foto-video", [chatAddMenuButtons[0].document()]);
    appendChildElements("li_add-file", [chatAddMenuButtons[1].document()]);
    appendChildElements("li_add-location", [chatAddMenuButtons[2].document()]);

    
    const openChatMenu = (): void => {
        addMenuChatMenu.show()    
    };

    const openAddMenu = (): void => {
        addMenuAddchat.show()
    };

    const closeMenu = (): void => {
        console.log(event.target)
    };

    mainWinButtons[0].eventBus.on(Component.EVENTS.buttonClick, openProfilePage);
    //добавляем событие для открытия меню чата
    mainWinButtons[2].eventBus.on(Component.EVENTS.buttonClick, openChatMenu);
    //
    addMenuChatMenu.eventBus.on(Component.EVENTS.mouseleave,  closeMenu);
    //добавляем открытие меню добавления обхъектов в чат
    mainWinButtons[3].eventBus.on(Component.EVENTS.buttonClick, openAddMenu);
    
//hideElement, showElement
};