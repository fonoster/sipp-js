<a name="SIPP"></a>

## SIPP
sipp-js is a wrapper for sipp. The purpose of this library is to simplify the
creation of SIPp instances. It is not intended to be a full SIPp implementation.

> This library requires the sipp executable to be installed on the system.

**Kind**: global class  

* [SIPP](#SIPP)
    * [new SIPP(options)](#new_SIPP_new)
    * [.setUsername(username)](#SIPP+setUsername) ⇒ [<code>SIPP</code>](#SIPP)
    * [.setPassword(password)](#SIPP+setPassword) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withScenario(scenarioFile)](#SIPP+withScenario) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withReportFreq(frequency)](#SIPP+withReportFreq) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withTraceStat()](#SIPP+withTraceStat) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withTraceScreen()](#SIPP+withTraceScreen) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withTransportMode(transportMode)](#SIPP+withTransportMode) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withInf(info)](#SIPP+withInf) ⇒ [<code>SIPP</code>](#SIPP)
    * [.setInfIndex(info, index)](#SIPP+setInfIndex) ⇒ [<code>SIPP</code>](#SIPP)
    * [.setVariable(variable, value)](#SIPP+setVariable) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withStats(fileName)](#SIPP+withStats) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withCallRate(rate)](#SIPP+withCallRate) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withCallLimit(limit)](#SIPP+withCallLimit) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withCallRateIncrease(rate, time)](#SIPP+withCallRateIncrease) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withCallMax(calls)](#SIPP+withCallMax) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withOpt(key, parameter)](#SIPP+withOpt) ⇒ [<code>SIPP</code>](#SIPP)
    * [.withTimeout(timeout)](#SIPP+withTimeout) ⇒ [<code>SIPP</code>](#SIPP)
    * [.build()](#SIPP+build) ⇒ <code>string</code>
    * [.start()](#SIPP+start) ⇒ <code>Promise.&lt;Buffer&gt;</code>
    * [.startAsync(callback)](#SIPP+startAsync) ⇒ <code>ChildProcess</code>
    * [.stop()](#SIPP+stop)

<a name="new_SIPP_new"></a>

### new SIPP(options)
Constructs a new SIPP object.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>SIPPOptions</code> | Configuration object for SIPP |
| options.remoteHost | <code>string</code> | Remote host to connect to |
| options.localPort | <code>number</code> | Local port to use for SIP signaling |
| options.timeout | <code>number</code> | Timeout for SIP signaling |

**Example**  
```js
const SIPP = require("sipp-js");
const sipp = new SIPP({
 remoteHost: "remote.host.com",
 localPort: 5060,
 timeout: 5000
});
sipp.setUsername("user");
sipp.setPassword("password");
sipp.setScenario(`${process.cwd()}/scenarios/etc/arc.xml`);
sipp.start();

assert.ok(result.stderr == null)
```
<a name="SIPP+setUsername"></a>

### sipP.setUsername(username) ⇒ [<code>SIPP</code>](#SIPP)
Optional username for SIP authentication.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| username | <code>string</code> | Username for SIP authentication |

<a name="SIPP+setPassword"></a>

### sipP.setPassword(password) ⇒ [<code>SIPP</code>](#SIPP)
Optional password for SIP authentication.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | Password for SIP authentication |

<a name="SIPP+withScenario"></a>

### sipP.withScenario(scenarioFile) ⇒ [<code>SIPP</code>](#SIPP)
Scenario file to use for SIP signaling.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| scenarioFile | <code>string</code> | Scenario file to use for SIP signaling |

<a name="SIPP+withReportFreq"></a>

### sipP.withReportFreq(frequency) ⇒ [<code>SIPP</code>](#SIPP)
Statistics report frequency.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| frequency | <code>number</code> | Frequency in seconds |

<a name="SIPP+withTraceStat"></a>

### sipP.withTraceStat() ⇒ [<code>SIPP</code>](#SIPP)
Dumps all statistics in <scenario_name>_<pid>.csv file.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
<a name="SIPP+withTraceScreen"></a>

### sipP.withTraceScreen() ⇒ [<code>SIPP</code>](#SIPP)
Dump statistic screens in the <scenario_name>_<pid>_screens.log file when quitting SIPp.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
<a name="SIPP+withTransportMode"></a>

### sipP.withTransportMode(transportMode) ⇒ [<code>SIPP</code>](#SIPP)
Selects the transport mode to use.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| transportMode | <code>TransportMode</code> | Transport mode to use |

<a name="SIPP+withInf"></a>

### sipP.withInf(info) ⇒ [<code>SIPP</code>](#SIPP)
Inject values from an external CSV file during calls into the scenarios.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
**Returns**: [<code>SIPP</code>](#SIPP) - Also see `setInfIndex`  

| Param | Type | Description |
| --- | --- | --- |
| info | <code>string</code> | CSV file to use |

<a name="SIPP+setInfIndex"></a>

### sipP.setInfIndex(info, index) ⇒ [<code>SIPP</code>](#SIPP)
Create an index of file using field.  For example -inf users.csv -infindex
users.csv 0 creates an index on the first key.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
**Returns**: [<code>SIPP</code>](#SIPP) - Also see `withInf`  

| Param | Type | Description |
| --- | --- | --- |
| info | <code>string</code> | CSV file to use |
| index | <code>number</code> | Index of CSV file to use |

<a name="SIPP+setVariable"></a>

### sipP.setVariable(variable, value) ⇒ [<code>SIPP</code>](#SIPP)
Sets a variable to a value. The variable must exist in the scenario.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| variable | <code>string</code> | Variable to set |
| value | <code>string</code> | Value to set |

<a name="SIPP+withStats"></a>

### sipP.withStats(fileName) ⇒ [<code>SIPP</code>](#SIPP)
Set the file name to use to dump statistics

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
**Returns**: [<code>SIPP</code>](#SIPP) - Also see `withReportFreq`  

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>string</code> | File name to use |

<a name="SIPP+withCallRate"></a>

### sipP.withCallRate(rate) ⇒ [<code>SIPP</code>](#SIPP)
Set the call rate (in calls per seconds).

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| rate | <code>number</code> | Call rate to use |

<a name="SIPP+withCallLimit"></a>

### sipP.withCallLimit(limit) ⇒ [<code>SIPP</code>](#SIPP)
Set max simultaneous calls.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
**Returns**: [<code>SIPP</code>](#SIPP) - Also see `withCallRate`  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | Number of calls to make |

<a name="SIPP+withCallRateIncrease"></a>

### sipP.withCallRateIncrease(rate, time) ⇒ [<code>SIPP</code>](#SIPP)
Set rate increase (in calls per seconds).

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
**Returns**: [<code>SIPP</code>](#SIPP) - Also see `withCallRate`  

| Param | Type | Description |
| --- | --- | --- |
| rate | <code>number</code> | Rate increase to use |
| time | <code>number</code> | Time to use |

<a name="SIPP+withCallMax"></a>

### sipP.withCallMax(calls) ⇒ [<code>SIPP</code>](#SIPP)
Set the number of calls to make.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| calls | <code>number</code> | Number of calls to make |

<a name="SIPP+withOpt"></a>

### sipP.withOpt(key, parameter) ⇒ [<code>SIPP</code>](#SIPP)
Sets an arbitrary parameter.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Option to set |
| parameter | <code>string</code> | Value to set |

<a name="SIPP+withTimeout"></a>

### sipP.withTimeout(timeout) ⇒ [<code>SIPP</code>](#SIPP)
Sets a timeout to quit SIPp.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| timeout | <code>number</code> | Timeout to use |

<a name="SIPP+build"></a>

### sipP.build() ⇒ <code>string</code>
Builds the command.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
<a name="SIPP+start"></a>

### sipP.start() ⇒ <code>Promise.&lt;Buffer&gt;</code>
Starts an instance of SIPp synchronously.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
<a name="SIPP+startAsync"></a>

### sipP.startAsync(callback) ⇒ <code>ChildProcess</code>
Starts an instance of SIPp asynchronously.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>callback</code> | Callback function |

<a name="SIPP+stop"></a>

### sipP.stop()
Stops the instance.

**Kind**: instance method of [<code>SIPP</code>](#SIPP)  
