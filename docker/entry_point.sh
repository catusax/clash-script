#!/bin/sh

if [ -z ${SUBSCRIBE} ]; then
    echo "SUBSCRIBE is not set"
    exit 1
fi

wget -O /root/.config/mihomo/config.yaml ${SUBSCRIBE}

# 更新字段
yq eval '.mixed-port = 7890' -i /root/.config/mihomo/config.yaml
yq eval '.external-controller = "0.0.0.0:9090"' -i /root/.config/mihomo/config.yaml
yq eval '.geox-url.geoip = "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.dat"' -i /root/.config/mihomo/config.yaml
yq eval '.geox-url.geosite = "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geosite.dat"' -i /root/.config/mihomo/config.yaml
yq eval '.geox-url.mmdb = "https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@release/geoip.metadb"' -i /root/.config/mihomo/config.yaml
yq eval '.external-ui = "/root/.config/mihomo/ui"' -i /root/.config/mihomo/config.yaml
yq eval ".rules = [\"DOMAIN,${DIRECT_DOMAIN},DIRECT\"] + .rules" -i /root/.config/mihomo/config.yaml

cat /root/.config/mihomo/config.yaml

/mihomo
