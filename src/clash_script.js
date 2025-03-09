// Define main function (script entry)

export default main

function main(config, profileName) {

  // 国内DNS服务器
  const domesticNameservers = [
    "https://dns.alidns.com/dns-query", // 阿里云公共DNS
    "https://doh.pub/dns-query", // 腾讯DNSPod
  ];
  // 国外DNS服务器
  const foreignNameservers = [
    "https://1.1.1.1/dns-query#节点选择", // Cloudflare(主)
    "https://1.0.0.1/dns-query#节点选择", // Cloudflare(备)
  ];
  // DNS配置
  const dnsConfig = {
    "enable": true,
    "ipv6": true,
    "enhanced-mode": "fake-ip",
    "use-system-hosts": true,
    "cache-algorithm": "arc",
    "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
    "nameserver": domesticNameservers,
    "fallback": foreignNameservers,
    "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
    "nameserver-policy": {
      "geosite:private,cn,geolocation-cn": domesticNameservers,
      "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
    }
  };

  let org_rules = config["rules"];
  let new_rules = [
    //steam
    // "DOMAIN-SUFFIX,steamstatic.com,DIRECT",
    "DOMAIN,dl.steam.clngaa.com,DIRECT",
    "DOMAIN,dl.steam.ksyna.com,DIRECT",
    "DOMAIN,dota2.wmsj.cn,DIRECT",
    "DOMAIN,st.dl.bscstorage.net,DIRECT",
    "DOMAIN,st.dl.eccdnx.com,DIRECT",
    "DOMAIN,st.dl.pinyuncloud.com,DIRECT",
    "DOMAIN,steampipe.steamcontent.tnkjmec.com,DIRECT",
    "DOMAIN,steampowered.com.8686c.com,DIRECT",
    "DOMAIN,steamstatic.com.8686c.com,DIRECT",
    "DOMAIN,wmsjsteam.com,DIRECT",
    "DOMAIN-SUFFIX,cm.steampowered.com,DIRECT",
    "DOMAIN-SUFFIX,steamchina.com,DIRECT",
    "DOMAIN-SUFFIX,steamcontent.com,DIRECT",
    "DOMAIN-SUFFIX,steamusercontent.com,DIRECT",
    "DOMAIN-SUFFIX,steamserver.net,DIRECT",
    "DOMAIN-SUFFIX,static3.cdn.ubi.com,DIRECT",
    "DOMAIN-SUFFIX,cdn.ubi.com,DIRECT",
    "DOMAIN-SUFFIX,azureedge.net,DIRECT",
    "DOMAIN-SUFFIX,fastly.steamstatic.com,节点选择",
    "RULE-SET,gamedownloads,DIRECT",
    // new bing
    "DOMAIN-SUFFIX,bing.cn,节点选择",
    "DOMAIN-SUFFIX,bing.com,节点选择",
    // Loyalsoldier 规则集
    "RULE-SET,applications,全局直连",
    "RULE-SET,private,全局直连",
    "RULE-SET,reject,广告过滤",
    "RULE-SET,icloud,苹果服务",
    "RULE-SET,apple,苹果服务",
    "RULE-SET,google,节点选择",
    "RULE-SET,proxy,节点选择",
    "RULE-SET,gfw,节点选择",
    "RULE-SET,tld-not-cn,节点选择",
    "RULE-SET,direct,全局直连",
    "RULE-SET,lancidr,全局直连,no-resolve",
    "RULE-SET,cncidr,全局直连,no-resolve",
    "RULE-SET,telegramcidr,节点选择,no-resolve",
    // 其他规则
    "GEOIP,LAN,全局直连,no-resolve",
    "GEOIP,CN,全局直连,no-resolve",
    "RULE-SET,direct,DIRECT",
    "MATCH,漏网之鱼"
  ]

  // https://a76yyyy.github.io/clash/zh_CN/premium/rule-providers.html
  // https://merlinkodo.github.io/Clash-Rev-Doc/config/rules/rule-provider/#classical
  // 规则集通用配置
  const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400
  };
  // 规则集配置
  const ruleProviders = {
    "reject": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
      "path": "./ruleset/loyalsoldier/reject.yaml"
    },
    "icloud": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
      "path": "./ruleset/loyalsoldier/icloud.yaml"
    },
    "apple": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
      "path": "./ruleset/loyalsoldier/apple.yaml"
    },
    "google": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
      "path": "./ruleset/loyalsoldier/google.yaml"
    },
    "proxy": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      "path": "./ruleset/loyalsoldier/proxy.yaml"
    },
    "direct": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
      "path": "./ruleset/loyalsoldier/direct.yaml"
    },
    "private": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
      "path": "./ruleset/loyalsoldier/private.yaml"
    },
    "gfw": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      "path": "./ruleset/loyalsoldier/gfw.yaml"
    },
    "tld-not-cn": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
      "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
    },
    "telegramcidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
    },
    "cncidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
      "path": "./ruleset/loyalsoldier/cncidr.yaml"
    },
    "lancidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
      "path": "./ruleset/loyalsoldier/lancidr.yaml"
    },
    "applications": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
      "path": "./ruleset/loyalsoldier/applications.yaml"
    },
    "gamedownloads": {
      ...ruleProviderCommon,
      "format": "yaml",
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/refs/heads/master/Clash/Providers/Ruleset/GameDownload.yaml",
      "path": "./ruleset/gamedownloads.yaml"
    },
  };

  config["dns"] = dnsConfig;
  // config["rules"] = new_rules.concat(org_rules)
  config["rules"] = new_rules
  config["rule-providers"] = ruleProviders;

  // 代理组通用配置
  const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false
  };

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "节点选择",
      "type": "select",
      "proxies": ["延迟选优", "故障转移"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
    },
    {
      ...groupBaseOption,
      "name": "延迟选优",
      "type": "url-test",
      "tolerance": 100,
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      ...groupBaseOption,
      "name": "故障转移",
      "type": "fallback",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
    },
    {
      ...groupBaseOption,
      "name": "国外媒体",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      ...groupBaseOption,
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      ...groupBaseOption,
      "name": "广告过滤",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      ...groupBaseOption,
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT", "节点选择", "延迟选优", "故障转移"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      ...groupBaseOption,
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择", "延迟选优", "故障转移", "全局直连"],
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ]
  return config;
}
