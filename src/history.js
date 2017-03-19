/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
const history = process.env.BROWSER ? createBrowserHistory() :
                typeof process === 'object' && process + '' === '[object process]' ? null :
                createMemoryHistory()
// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
export default history;
