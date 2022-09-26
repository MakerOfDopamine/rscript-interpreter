const SYSTEM = {
    CLEAR_LOG() {
        rScript.log = []
    },
    KEYWORDS: ["DEFINE"],
    THROW_ERROR(error) {
        rScript.log.push({
            type: "error",
            content: error,
            id: rScript.id
        })
        rScript.logId++
    }
}

let rScript = {
    logId: 1,
    log: [],
    vars_name: [],
    vars_type: [],
    vars_value: [],
    interpretLine(l) {
        let d = l.split(" ")
        if (!(d[0] in SYSTEM.KEYWORDS)) {
            SYSTEM.THROW_ERROR("NoKeyword")
            return
        } else {
            switch (d[0]) {
                case "DEFINE":
                    rScript.defineVariable(d[1], d[2], d[3])
            }
        }
    },
    defineVariable(type, name, value) {
        switch (type) {
            case "INT_SIGNED":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                }
                if (value < -2147483647 || value > 2147483647) SYSTEM.THROW_ERROR("ValueOutOfRange")
                if (value != Math.floor(value)) SYSTEM.THROW_ERROR("WrongType")
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
            case "INT_UNSIGNED":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                }
                if (value < 0 || value > 2147483648*2-1) SYSTEM.THROW_ERROR("ValueOutOfRange")
                if (value != Math.floor(value)) SYSTEM.THROW_ERROR("WrongType")
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
            case "STRING":
                if (!(typeof value == String)) SYSTEM.THROW_ERROR("WrongType")
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
            case "FLOAT":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                }
                if (value > 2**128-1) SYSTEM.THROW_ERROR("ValueOutOfRange")
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
            case "DOUBLE":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                }
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
            default:
                SYSTEM.THROW_ERROR("InvalidType")
        }
    }
}