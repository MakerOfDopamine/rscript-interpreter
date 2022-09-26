const SYSTEM = {
    CLEAR_LOG() {
        rScript.log = []
    },
    KEYWORDS: ["DEFINE", "SET"],
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
        if (!(SYSTEM.KEYWORDS.includes(d[0]))) {
            SYSTEM.THROW_ERROR("NoKeyword")
            return
        } else {
            switch (d[0]) {
                case "DEFINE":
                    if (d.length < 4) SYSTEM.THROW_ERROR("NotEnoughArgs")
                    rScript.defineVariable(d[1], d[2], d[3])
                case "SET":
                    rScript
            }
        }
    },
    defineVariable(type, name, value) {
        switch (type) {
            case "INT_SIGNED":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                    return
                }
                if (value < -2147483647 || value > 2147483647) SYSTEM.THROW_ERROR("ValueOutOfRange")
                if (value != Math.floor(value)) SYSTEM.THROW_ERROR("WrongType")
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
                return
            case "INT_UNSIGNED":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                    return
                }
                if (value < 0 || value > 2147483648*2-1) SYSTEM.THROW_ERROR("ValueOutOfRange")
                if (value != Math.floor(value)) SYSTEM.THROW_ERROR("WrongType")
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
                return
            case "STRING":
                if (!(typeof value == String)) {
                    SYSTEM.THROW_ERROR("WrongType")
                    return
                }
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
                return
            case "FLOAT":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                    return
                }
                if (value > 2**128-1) SYSTEM.THROW_ERROR("ValueOutOfRange")
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
                return
            case "DOUBLE":
                value = Number(value)
                if (isNaN(value)) {
                    SYSTEM.THROW_ERROR("WrongType")
                    return
                }
                this.vars_name.push(name)
                this.vars_type.push(type)
                this.vars_value.push(value)
                return
            default:
                SYSTEM.THROW_ERROR("InvalidType")
        }
    }
}