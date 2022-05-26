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
export interface SIPPOptions {
  remoteHost?: string;
  localPort: number;
  timeout?: number;
}

export enum TransportMode {
  U1 = "u1",
  UN = "un",
  UIU = "ui",
  T1 = "t1",
  TN = "tn",
  L1 = "l1",
  LN = "ln",
  S1 = "s1",
  SN = "sn"
}
