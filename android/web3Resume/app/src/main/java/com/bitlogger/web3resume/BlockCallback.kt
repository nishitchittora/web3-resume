package com.bitlogger.web3resume

interface BlockCallback {
    fun isLoading(boolean: Boolean)

    fun success(data: Any?)

    fun error(message: String)
}