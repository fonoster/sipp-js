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
import {execSync, exec} from "child_process";
import {SIPPOptions, TransportMode} from "./types";

/**
 * @classdesc sipp-js is a wrapper for sipp. The purpose of this library is to simplify the
 * creation of SIPp instances. It is not intended to be a full SIPp implementation.
 *
 * > This library requires the sipp executable to be installed on the system.
 *
 * @example
 * const SIPP = require("sipp-js");
 *
 * const sipp = new SIPP({
 *  remoteHost: "remote.host.com",
 *  localPort: 5060,
 *  timeout: 5000
 * });
 * sipp.setUsername("user");
 * sipp.setPassword("password");
 * sipp.setScenario(`${process.cwd()}/scenarios/etc/arc.xml`);
 * sipp.start();
 *
 * assert.ok(result.stderr == null)
 */
export default class SIPP {
  timeout: number;
  opts: Map<string, string>;
  cmd: string;
  /**
   * Constructs a new SIPP object.
   *
   * @param {SIPPOptions} options - Configuration object for SIPP
   * @param {string} options.remoteHost - Remote host to connect to
   * @param {number} options.localPort - Local port to use for SIP signaling
   * @param {number} options.timeout - Timeout for SIP signaling
   */
  constructor(options: SIPPOptions) {
    const opts = new Map();
    opts.set(
      "-p",
      options.localPort || Math.floor(Math.random() * 6000) + 5080
    );
    opts.set("-m", 1);
    opts.set("-d", 1);
    opts.set("-t", "t1");
    opts.set("-trace_err", "");
    opts.set("-trace_msg", "");
    opts.set("-timeout", options.timeout || 60000);
    this.cmd = options.remoteHost ? `sipp ${options.remoteHost}` : "sipp";
    this.timeout = options.timeout;
    this.opts = opts;
  }

  /**
   * Optional username for SIP authentication.
   * @param {string} username - Username for SIP authentication
   * @return {SIPP}
   */
  setUsername(username: string): SIPP {
    return this.withOpt("-au", username);
  }

  /**
   * Optional password for SIP authentication.
   * @param {string} password - Password for SIP authentication
   * @return {SIPP}
   */
  setPassword(password: string): SIPP {
    return this.withOpt("-ap", password);
  }

  /**
   * Scenario file to use for SIP signaling.
   * @param {string} scenarioFile - Scenario file to use for SIP signaling
   * @return {SIPP}
   */
  withScenario(scenarioFile: string): SIPP {
    return this.withOpt("-sf", scenarioFile);
  }

  /**
   * Statistics report frequency.
   * @param {number} frequency - Frequency in seconds
   * @return {SIPP}
   */
  withReportFreq(frequency: number): SIPP {
    return this.withOpt("-fd ", frequency);
  }

  /**
   * Dumps all statistics in <scenario_name>_<pid>.csv file.
   * @return {SIPP}
   */
  withTraceStat(): SIPP {
    return this.withOpt("-trace_stat ", "");
  }

  /**
   * Dump statistic screens in the <scenario_name>_<pid>_screens.log file when quitting SIPp.
   * @return {SIPP}
   */
  withTraceScreen(): SIPP {
    return this.withOpt("-trace_screen ", "");
  }

  /**
   * Selects the transport mode to use.
   * @param {TransportMode} transportMode - Transport mode to use
   * @return {SIPP}
   */
  withTransportMode(transportMode: TransportMode): SIPP {
    return this.withOpt("-t", transportMode);
  }

  /**
   * Inject values from an external CSV file during calls into the scenarios.
   * @param {string} info - CSV file to use
   * @return {SIPP}
   * Also see `setInfIndex`
   */
  withInf(info: string): SIPP {
    return this.withOpt("-inf", info);
  }

  /**
   * Create an index of file using field.  For example -inf users.csv -infindex
   * users.csv 0 creates an index on the first key.
   * @param {string} info - CSV file to use
   * @param {number} index - Index of CSV file to use
   * @return {SIPP}
   * Also see `withInf`
   */
  setInfIndex(info: string, index: string): SIPP {
    return this.withOpt("-infindex", `${info} ${index}`);
  }

  /**
   * Sets a variable to a value. The variable must exist in the scenario.
   * @param {string} variable - Variable to set
   * @param {string} value - Value to set
   * @return {SIPP}
   */
  setVariable(variable: string, value: string): SIPP {
    return this.withOpt(`-set ${variable}`, value);
  }

  /**
   * Set the file name to use to dump statistics
   * @param {string} fileName - File name to use
   * @return {SIPP}
   * Also see `withReportFreq`
   */
  withStats(fileName: string): SIPP {
    return this.withOpt("-stf", fileName);
  }

  /**
   * Set the call rate (in calls per seconds).
   * @param {number} rate - Call rate to use
   * @return {SIPP}
   */
  withCallRate(rate: number): SIPP {
    return this.withOpt("-r", rate);
  }

  /**
   * Set max simultaneous calls.
   * @param {number} limit - Number of calls to make
   * @return {SIPP}
   * Also see `withCallRate`
   */
  withCallLimit(limit: number): SIPP {
    return this.withOpt("-l", limit);
  }

  /**
   * Set rate increase (in calls per seconds).
   * @param {number} rate - Rate increase to use
   *  @param {number} time - Time to use
   * @return {SIPP}
   * Also see `withCallRate`
   */
  withCallRateIncrease(rate: number, time: number): SIPP {
    this.withOpt("-rate_increase", rate);
    return this.withOpt("-fd", time);
  }

  /**
   * Set the number of calls to make.
   * @param {number} calls - Number of calls to make
   * @return {SIPP}
   */
  withCallMax(calls: number): SIPP {
    return this.withOpt("-m", calls);
  }

  /**
   * Sets an arbitrary parameter.
   * @param {string} key - Option to set
   * @param {string} parameter - Value to set
   * @return {SIPP}
   */
  withOpt(key: string, parameter: string | number): SIPP {
    this.opts.set(key, parameter + "");
    return this;
  }

  /**
   * Sets a timeout to quit SIPp.
   * @param {number} timeout - Timeout to use
   * @return {SIPP}
   */
  withTimeout(timeout: number): SIPP {
    this.timeout = timeout;
    return this;
  }

  /**
   * Builds the command.
   * @return {string}
   */
  build(): string {
    let opts = "";

    // eslint-disable-next-line no-loops/no-loops
    for (const [key, value] of this.opts) {
      opts = `${opts} ${key} ${value}`;
    }

    return `${this.cmd} ${opts} `;
  }

  /**
   * Starts an instance of SIPp synchronously.
   * @return {Promise<Buffer>}
   */
  start(): Buffer {
    const cmd = this.build();
    let result: Buffer;
    try {
      result = execSync(cmd, {
        timeout: this.timeout,
        stdio: "pipe"
      });
    } catch (e) {
      result = e;
    }

    // Give it some time to close the port
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sleep = require("system-sleep");
    sleep(5000);

    return result;
  }

  /**
   * Starts an instance of SIPp asynchronously.
   * @param {callback} callback - Callback function
   * @return {ChildProcess}
   */
  startAsync(
    callback: (error: Error, result: unknown) => void
  ): import("child_process").ChildProcess {
    const cmd = this.build();
    return exec(
      cmd,
      {
        timeout: this.timeout,
        stdio: "pipe"
      } as unknown,
      callback
    );
  }

  /**
   * Stops the instance.
   */
  stop(): void {
    throw new Error("Not implemented");
  }
}
