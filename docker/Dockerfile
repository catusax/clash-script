FROM ghcr.io/metacubex/metacubexd:latest AS metacubexd


FROM metacubex/mihomo:latest

RUN apk add --no-cache yq

COPY --from=metacubexd /srv /root/.config/mihomo/ui

ADD entry_point.sh /entry_point.sh
RUN chmod +x /entry_point.sh

ENTRYPOINT [ "sh", "/entry_point.sh" ]
