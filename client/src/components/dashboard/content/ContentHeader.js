import React from 'react';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';


const ContentHeader = (props) => {
    const routes = [
        {
            path: '/dashboard',
            breadcrumbName: 'Home'
        },
        {
            breadcrumbName: props.title
        }
    ];

    const itemRender = (route, params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;

        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        );
    };

    return (
        <div id="content-header" className="space-between">
            <div id="content-header-left">
                <PageHeader className="site-page-header" title={props.title} breadcrumb={{ routes, itemRender }}/>
            </div>
        </div>
    );
};

export default ContentHeader;