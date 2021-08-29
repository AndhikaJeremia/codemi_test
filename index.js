const readline = require('readline')

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let arr = []
let initialData = 0
let nomorloker = 0
let indexesDeleted = NaN

input.on('line',(answer) => {
    answer = answer.split(' ')
    let command = answer[0].toLowerCase()
    if(command === 'init') {
       initialData = parseInt(answer[1])
        console.log(`berhasil membuat loker dengan jumlah ${initialData}`)
    }
    else if(command === 'input'){
        if(initialData === arr.length) console.log('maaf loker sudah penuh')
        else {
            if(indexesDeleted){
                const data = {
                    no_loker: indexesDeleted + 1, 
                    tipe_identitas: answer[1].toUpperCase(), 
                    no_identitas: parseInt(answer[2])
                }
                arr.splice(indexesDeleted, 0, data)
                console.log(`Kartu identitas tersimpan di loker nomor ${indexesDeleted + 1}`)
                indexesDeleted = NaN
            }
            else{
                arr.push({no_loker: nomorloker + 1, tipe_identitas: answer[1].toUpperCase(), no_identitas: parseInt(answer[2])})
                nomorloker += 1
                console.log(`Kartu identitas tersimpan di loker nomor ${nomorloker}`)
            }
        }
    }
    else if(command === 'status'){
        if(arr.length === 0) console.log('belum ada loker')
        else {
            arr.map((item) => {
                console.log(item)
            })
        }
    }
    else if(command === 'leave'){
        if(arr.length === 0) console.log('belum ada loker')
        else{
            indexesDeleted = arr.findIndex((item) => item.no_loker === parseInt(answer[1]))
            arr.splice(indexesDeleted, 1)
            console.log(`Loker nomor ${answer[1]} berhasil di kosongkan`)
        }
    }
    else if(command === 'find'){
        if(arr.length === 0) console.log('belum ada loker')
        else{
            let indexesItem = arr.findIndex((item) => item.no_identitas === parseInt(answer[1]))
            if(indexesItem === -1) console.log('Nomor Identitas tidak ditemukan')
            else console.log(`Kartu identitas tersebut berada di loker nomor ${arr[indexesItem].no_loker}`)
        }
    }
     else if(command === 'search'){
        if(arr.length === 0) console.log('belum ada loker')
        else{
            let hasil = []
            arr.map((item) => {
                if(item.tipe_identitas === answer[1].toUpperCase()) hasil.push(item.no_identitas)
            })
            console.log(hasil.toString())
        }
    }
    else if(command === 'exit') input.close()
    else if(command === '.help') console.log(`init : initial loker \ninput : masukan data (input 'tipe identitas' 'nomor identitas') \nstatus : check data \nleave : delete data \nfind : mencari berdasarkan nomor identitas \nsearch : mencari berdasarkan tipe identitas \nexit : terminate program`)
    else console.log('.help : list perintah yang bisa digunakan')
})