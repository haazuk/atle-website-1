{ pkgs }: {
  deps = [
    pkgs.nodejs
    pkgs.nodejs-12_x
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}