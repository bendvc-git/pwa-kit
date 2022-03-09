/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'

import {configureRoutes} from './routes-utils'
import {getUrlConfig} from './utils'

describe('configureRoutes', function() {
    const env = process.env
    beforeEach(() => {
        jest.resetModules()
        process.env = {...env}
    })

    afterEach(() => {
        process.env = env
    })
    const CompA = () => <div>This is component A</div>
    const CompC = () => <div>This is component C</div>

    const routes = [
        {
            path: '/',
            component: CompA,
            exact: true
        },
        {
            path: '/category/:categoryId',
            component: CompC,
            exact: true
        }
    ]
    test('should return all permutation of path each site and locales setting', () => {
        const configuredRoutes = configureRoutes(routes, getUrlConfig(), {ignoredRoutes: ['/']})
        expect(configuredRoutes[configuredRoutes.length - 1].path).toEqual('/category/:categoryId')
        expect(configuredRoutes.length).toEqual(27)
        const paths = configuredRoutes.map((route) => route.path)
        expect(paths).toEqual(expectedPathsResult)
    })

    test('should return the origin routes', () => {
        const configuredRoutes = configureRoutes(routes, getUrlConfig(), {
            ignoredRoutes: ['/', '/category/:categoryId']
        })
        expect(configuredRoutes.length).toEqual(2)
    })
})

const expectedPathsResult = [
    '/',
    '/uk/en-uk/category/:categoryId',
    '/uk/en-GB/category/:categoryId',
    '/uk/fr/category/:categoryId',
    '/uk/fr-FR/category/:categoryId',
    '/uk/it/category/:categoryId',
    '/uk/it-IT/category/:categoryId',
    '/site-1/en-uk/category/:categoryId',
    '/site-1/en-GB/category/:categoryId',
    '/site-1/fr/category/:categoryId',
    '/site-1/fr-FR/category/:categoryId',
    '/site-1/it/category/:categoryId',
    '/site-1/it-IT/category/:categoryId',
    '/uk/category/:categoryId',
    '/site-1/category/:categoryId',
    '/en-uk/category/:categoryId',
    '/en-GB/category/:categoryId',
    '/fr/category/:categoryId',
    '/fr-FR/category/:categoryId',
    '/it/category/:categoryId',
    '/it-IT/category/:categoryId',
    '/us/en-US/category/:categoryId',
    '/site-2/en-US/category/:categoryId',
    '/us/category/:categoryId',
    '/site-2/category/:categoryId',
    '/en-US/category/:categoryId',
    '/category/:categoryId'
]
