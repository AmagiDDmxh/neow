import IO from './index'

interface Uint8Array {
    asSerializable(T: Function): IO.ISerializable;
}

interface Uint8ArrayConstructor {
    fromSerializable(obj: IO.ISerializable): Uint8Array;
}

Uint8Array.prototype.asSerializable = function (T: Function): IO.ISerializable {
    let ms = new IO.MemoryStream(this.buffer, false);
    let reader = new IO.BinaryReader(ms);
    return reader.readSerializable(T);
}

Uint8Array.fromSerializable = function (obj: IO.ISerializable): Uint8Array {
    let ms = new IO.MemoryStream();
    let writer = new IO.BinaryWriter(ms);
    obj.serialize(writer);
    return new Uint8Array(ms.toArray());
}
