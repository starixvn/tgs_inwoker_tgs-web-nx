import forge from "node-forge";
export function useEncryptPassword() {
  const encryptPassword = (password: string) => {
    const publicKeyPem = `-----BEGIN PUBLIC KEY-----
                    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDX8zEHyerJpU5UWOIxy4wG6Gyw
                    AZfHEPPAcxYZ8I4ncDn7aD2TW92tNLbdVQbikRcsHTCw+6yOY5f+rvXEwLECp0oL
                    yDnv3zr+49lQqZ1N8mwC9UmSvxMk911P+RlQkHJVeZftT3zIB65jbnD34Dh5BGHK
                    K9x8l1aD3mbvGiBZFQIDAQAB
                    -----END PUBLIC KEY-----`;
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
