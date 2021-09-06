import * as React from 'react';
import { DropdownItemProps } from '../Dropdown';
export interface Props {
    /**
     * Enable go button
     */
    enableGlobalGo: boolean;
    /**
     * Enable global elements
     */
    enableGlobalElement?: React.ReactNode;
    /**
     * Logo url
     */
    logo?: string;
    /**
     * Enable search
     */
    enableSearch?: boolean;
    /**
     * Callback when search input is Key.
     */
    searchOnKeyDown?(e: React.FormEvent<HTMLElement> | KeyboardEvent): void;
    /**
     * Right side children
     */
    rightChildren?: React.ReactNode[];
    /**
     * Check login status for user
     */
    isLoggedIn: boolean;
    /**
     * LogIn user name or email
     */
    userName: string;
    /**
     * Logout url for redirection
     */
    logoutUrl: string;
    /**
     * Additional items for dropdown
     */
    additionalLIst?: DropdownItemProps[];
    /**
     * Login url
     */
    loginUrl: string;
    /**
     * Login User profile pic
     */
    profilePic?: string;
    onHeightChange?: (height: number) => void;
}
declare const AppBar: React.FC<Props>;
export default AppBar;
