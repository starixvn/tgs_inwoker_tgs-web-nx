import forge from "node-forge";
import config from "@tgs-web-nx/config";
export function useEncryptPassword() {
  const encryptPassword = (password: string) => {
    const publicKeyPem = config.encryptPublicKey;
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(password, "RSA-OAEP", {
      md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
  };

  return {
    encryptPassword,
  };
}
