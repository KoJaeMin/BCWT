declare interface EchoMessage{
    "IsValid" : boolean,
    "msg" : "Receive Valid Block" | "Invalid Block is exist"
}
declare interface SendMessage{
    "code" : -1 | 1 | 0,
    "msg" : string
}