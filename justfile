alias b := build
alias c := clean
alias s := serve

build:
    pnpm bundle
serve:
    firefox http://[::1]:8080 && miniserve dist --index index.html
clean:
    pnpm clean
