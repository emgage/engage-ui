import * as React from 'react';
import * as style from './example.scss';

export default() => (
    <div className={style.Nav}>
        <div className={style.NavHeader}>
            <span>engage-ui</span>
        </div>
        <div className={style.NavMenu}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/components">Components</a></li>
                <li><a href="https://github.com/emgage/engage-ui">Github</a></li>
            </ul>
        </div>
    </div>
);
