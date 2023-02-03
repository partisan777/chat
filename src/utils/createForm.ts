import { createNodeObjects } from "./createNodeObject";

export function createForm(parentDivClasses: string[], parentDivId: string, formAction: string, formClasses: string[], formId: string, childDivId: string, childDivClasses: string[], formLabel: string): HTMLElement {
    
    // let result = createNodeObjects(type='div', classNames=parentDivClasses, attr={id: parentDivId}, textContent= '')
    let result: HTMLElement = createNodeObjects('div', parentDivClasses, {id: parentDivId}, '')
    if (parentDivClasses.length === 0) {
        result.innerHTML = `<form action="${formAction}" class="${formClasses.join(' ')}" Id="${formId}"></form>`;
    } else {
        result.innerHTML =       
            `<form action="${formAction}" class="${formClasses.join(' ')}" Id="${formId}">
                <div class="${childDivClasses.join(' ')}" id="${childDivId}">
                    <h2>${formLabel}</h2>
                </div>
            </form>`;
    }
    return result;
};



