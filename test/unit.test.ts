/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster
 *
 * This file is part of sipp-js
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import SIPP from '../src/sipp'

const expect = chai.expect
chai.use(sinonChai)
const sandbox = sinon.createSandbox();

describe('test plan for sipp-js', () => {
  afterEach(() => sandbox.restore());

  it('checks the default configuration', () => {
    const sipp = new SIPP({
      remoteHost: 'localhost',
      localPort: 5060,
      timeout: 3000,
    })
    expect(sipp.build()).to.include('sipp localhost')
    expect(sipp.build()).to.include('-p 5060')
    expect(sipp.build()).to.include('-m 1')
    expect(sipp.build()).to.include('-d 1')
    expect(sipp.build()).to.include('-t t1')
    expect(sipp.build()).to.include('-trace_err')
    expect(sipp.build()).to.include('-trace_msg')
    expect(sipp.build()).to.include('-timeout 3000')
  })

  it('checks additional modifiers', () => {
    const sipp = new SIPP({
      remoteHost: 'localhost',
      localPort: 5060,
      timeout: 3000,
    })
    sipp.setUsername('asterisk')
    sipp.setPassword('changeit')
    sipp.withScenario('/path/to/scenario.xml')
    sipp.withTraceStat()
    sipp.withTraceScreen()
    sipp.withReportFreq(60)
    expect(sipp.build()).to.include('-au asterisk')
    expect(sipp.build()).to.include('-ap changeit')
    expect(sipp.build()).to.include('-sf /path/to/scenario.xml')
    expect(sipp.build()).to.include('-trace_stat')
    expect(sipp.build()).to.include('-trace_screen')
    expect(sipp.build()).to.include(60)
  })
})
