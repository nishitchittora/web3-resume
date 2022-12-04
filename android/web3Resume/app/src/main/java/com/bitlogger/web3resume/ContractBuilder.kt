package com.bitlogger.web3resume

import android.util.Log
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.web3j.crypto.Credentials
import org.web3j.protocol.Web3j
import org.web3j.protocol.infura.InfuraHttpService
import java.math.BigInteger

class ContractBuilder {
    // contract address
    val contractAddress = "0xa3A36fB34D2295171724e5D7E94FE22612823ea0"

    // endpoint url provided by infura
    val url = "https://goerli.infura.io/v3/6b29aa8e78aa452289a9d37d89ea0727"

    // web3j infura instance
    val web3j = Web3j.build(InfuraHttpService(url))

    // gas limit
    val gasLimit: BigInteger = BigInteger.valueOf(20_000_000_000L)

    // gas price
    val gasPrice: BigInteger = BigInteger.valueOf(4300000)

    // create credentials w/ your private key
    val credentials =
        Credentials.create("96cfb288d136b0d929d7877f73915f36396fdef5734e5c26f6c34ca4a2008b63")

    fun get() {
        CoroutineScope(Dispatchers.IO).launch {
            val institute = Institutes.load(contractAddress, web3j, credentials, gasLimit, gasPrice)
            Log.e("ABC", "Check validity ${institute.isValid}")
            withContext(Dispatchers.IO) {
                val data = institute.instituteCount().sendAsync().get()
                Log.d("AA", "${data.abs()}")
            }
        }
    }

    fun addInstitute(name: String, desc: String, wallet: String, callback: BlockCallback) {
        CoroutineScope(Dispatchers.IO).launch {
            callback.isLoading(true)
            val institute = Sbt.load(contractAddress, web3j, credentials, gasLimit, gasPrice)
            withContext(Dispatchers.IO) {
                try {
                    val data = institute.addInstitute(name, desc, wallet).sendAsync().get()
                    if (data.isStatusOK) {
                        callback.success(null)
                    }
                }catch (ex: Exception){
                    callback.isLoading(false)
                    callback.error(ex.message.toString())
                }
            }
        }
    }


    fun mintUser(
        reciver: String,
        expType: String,
        title: String,
        desc: String,
        date: String,
        endDate: String,
        callback: BlockCallback
    ) {
        CoroutineScope(Dispatchers.IO).launch {
            callback.isLoading(true)
            val sbt = Sbt.load(contractAddress, web3j, credentials, gasLimit, gasPrice)
            Log.e("ABC", "Check validity ${sbt.isValid}")
            withContext(Dispatchers.IO) {
                try {
                    val res = sbt.mint(
                        reciver,
                        expType,
                        title,
                        desc,
                        date,
                        endDate,
                    ).sendAsync().get()
                    if (res.isStatusOK) {
                        callback.success(null)
                    }
                }catch (ex: Exception) {
                    callback.error(ex.message.toString())
                }
            }
        }
    }
}