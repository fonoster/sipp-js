const {
    execSync,
    exec
} = require('child_process')

class SIPpW {
    constructor(remoteHost, localPort = Math.floor(Math.random() * 6000) + 5080, timeout = 60000) {
        this.opts = new Map()
        this.opts.set('-p', localPort)
        this.opts.set('-m', 1)
        this.opts.set('-d', 1)
        this.opts.set('-t', 't1')
        this.opts.set('-trace_err', '')
        this.opts.set('-trace_msg', '')
        this.opts.set('-timeout', timeout)
        // this.cmd = `docker run --rm -t -p ${localPort}:${localPort} -p ${localPort}:${localPort}/udp -v $PWD:/sipp ctaloi/sipp ${remoteHost}`
        this.cmd = remoteHost ? `sipp ${remoteHost}` : 'sipp'
        this.timeout = timeout
    }

    setUsername(username) {
        return this.withOpt('-au', username)
    }

    setPassword(password) {
        return this.withOpt('-ap', password)
    }

    withScenario(scenarioFile) {
        return this.withOpt('-sf', scenarioFile)
    }

    withReportFreq(fd) {
        return this.withOpt('-fd ', fd)
    }

    withTraceStat() {
        return this.withOpt('-trace_stat ', '')
    }

    /*withTraceError() {
        return this.withOpt('-trace_err ', '')
    }

    withTraceMsg() {
        return this.withOpt('-trace_msg ', '')
    }*/

    withTraceScreen() {
        return this.withOpt('-trace_screen ', '')
    }

    withTransportMode(transportMode) {
        // TODO: Validate this entry
        return this.withOpt('-t', transportMode)
    }

    withInf(info) {
        return this.withOpt('-inf', info)
    }

    setInfIndex(info, index) {
        return this.withOpt('-infindex', `${info} ${index}`)
    }


    setVariable(variable, value) {
        return this.withOpt(`-set ${variable}`, value)
    }

    withStats(statsFile) {
        return this.withOpt('-stf', statsFile)
    }

    withCallRate(rate) {
        return this.withOpt('-r', rate)
    }

    withCallLimit(limit) {
        return this.withOpt('-l', limit)
    }

    withCallRateIncrease(rate, time) {
        this.withOpt('-rate_increase', rate)
        return this.withOpt('-fd', time)
    }

    withCallMax(maximum) {
        return this.withOpt('-m', maximum)
    }

    withOpt(key, parameter) {
        this.opts.set(key, parameter)
        return this
    }

    withTimeout(timeout) {
        this.timeout = timeout
        return this
    }

    build() {
        let opts = ''

        for (const [key, value] of this.opts) {
            opts = `${opts} ${key} ${value}`
        }

        return `${this.cmd} ${opts} `
    }

    start() {
        const cmd = this.build()
        let result
        try {
            result = execSync(cmd, {
                timeout: this.timeout,
                stdio: 'pipe'
            })
        } catch (e) {
            result = e
        }

        // Give it some time to close the port
        const sleep = require('system-sleep')
        sleep(5000)

        return result
    }

    startAsync(callback) {
        const cmd = this.build()
        return exec(cmd, {
            timeout: this.timeout,
            stdio: 'pipe'
        }, callback)
    }

    stop() {
        // Noop
    }
}

module.exports = SIPpW