import bcrypt from "bcrypt";

const gerarHash = async () => {
    const senha = await bcrypt.hash("123456", 10);
    console.log("Hash gerado:", senha);
};

gerarHash();
