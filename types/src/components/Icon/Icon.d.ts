import * as React from 'react';
import { ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { SVGSource } from '@shopify/images';
export declare type Color = ('white' | 'black' | 'skyLighter' | 'skyLight' | 'sky' | 'skyDark' | 'inkLightest' | 'inkLighter' | 'inkLight' | 'ink' | 'blueLighter' | 'blueLight' | 'blue' | 'blueDark' | 'blueDarker' | 'indigoLighter' | 'indigoLight' | 'indigo' | 'indigoDark' | 'indigoDarker' | 'tealLighter' | 'tealLight' | 'teal' | 'tealDark' | 'tealDarker' | 'greenLighter' | 'green' | 'greenDark' | 'yellowLighter' | 'yellow' | 'yellowDark' | 'orange' | 'redLighter' | 'red' | 'redDark' | 'purple');
export declare const BUNDLED_ICONS: {
    add: any;
    alert: any;
    alignCenter: any;
    alignLeft: any;
    alignRight: any;
    archive: any;
    archiveSolid: any;
    arrowDown: any;
    arrowLeft: any;
    arrowRight: any;
    arrowUp: any;
    bell: any;
    calendar: any;
    calendarTimes: any;
    cancel: any;
    cancelSmall: any;
    caretDown: any;
    caretUp: any;
    chartArea: any;
    chartBar: any;
    chartPie: any;
    chat: any;
    check: any;
    checkCircle: any;
    checkSquare: any;
    chevronDown: any;
    chevronLeft: any;
    chevronRight: any;
    chevronUp: any;
    circle: any;
    circleCancel: any;
    circleChevronDown: any;
    circleChevronLeft: any;
    circleChevronRight: any;
    circleChevronUp: any;
    circlePlus: any;
    clip: any;
    clock: any;
    comments: any;
    container: any;
    conversation: any;
    database: any;
    disable: any;
    dispute: any;
    duplicate: any;
    embed: any;
    enumList: any;
    envelope: any;
    event: any;
    external: any;
    file: any;
    fileSolid: any;
    fileTextSearch: any;
    filter: any;
    folder: any;
    grid: any;
    handsHelping: any;
    hierarchy: any;
    horizontalDots: any;
    image: any;
    infoCircle: any;
    inbox: any;
    lightbulb: any;
    list: any;
    listAlt: any;
    listHierarchy: any;
    listingPage: any;
    lock: any;
    minusMinor: any;
    notes: any;
    paintBrush: any;
    pen: any;
    plus: any;
    print: any;
    puzzlePiece: any;
    refresh: any;
    risk: any;
    search: any;
    spinner: any;
    spinnerDots: any;
    table: any;
    tachometer: any;
    text: any;
    thumbsDown: any;
    thumbsUp: any;
    triangleDown: any;
    user: any;
    userCog: any;
    userEdit: any;
    userMd: any;
    userNinja: any;
    users: any;
    usersCog: any;
    userTie: any;
    video: any;
    view: any;
    checkBox: any;
    dropdown: any;
    initial: any;
    radioButton: any;
    signature: any;
    signatureAlt: any;
    userAdd: any;
    userAlt: any;
    usersAlt: any;
    textField: any;
    delete: any;
    export: any;
    import: any;
    minusIcon: any;
};
export interface Props {
    source: SVGSource | 'placeholder' | keyof typeof BUNDLED_ICONS;
    componentColor?: Color;
    backdrop?: boolean;
    accessibilityLabel?: string;
    componentStyle?: React.CSSProperties;
    componentClass?: string;
    theme?: any;
    callbackValue?: any;
    onClick?(id: number | string, additionalParam?: boolean): void;
}
declare const _default: ThemedComponentClass<Props, {}>;
export default _default;
