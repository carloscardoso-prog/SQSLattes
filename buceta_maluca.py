import requests
import random
import concurrent.futures
import time
import sys
import warnings
import json

warnings.filterwarnings("ignore", category=requests.packages.urllib3.exceptions.InsecureRequestWarning)

def test_proxy(proxy, test_url="http://www.google.com", timeout=3):
    """Testa um proxy de forma rápida usando um alvo genérico"""
    proxy_url = f"http://{proxy}"
    try:
        start = time.time()
        with requests.get(test_url, 
                         proxies={"http": proxy_url, "https": proxy_url},
                         timeout=timeout) as response:
            if response.status_code == 200:
                return proxy_url, time.time() - start
    except:
        pass
    return None

def get_fast_proxy(max_workers=20, max_tests=50):
    """Obtém um proxy funcional rapidamente usando multi-threading"""
    # Configuração para produção (sem prints desnecessários)
    sources = [
        "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=5000",
        "https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt",
        "https://www.proxy-list.download/api/v1/get?type=http"
    ]
    
    # Coleta proxies de todas as fontes
    all_proxies = []
    for source in sources:
        try:
            response = requests.get(source, timeout=5)
            proxies = [p.strip() for p in response.text.split('\n') if ':' in p.strip()]
            all_proxies.extend(proxies)
        except:
            continue
    
    if not all_proxies:
        return None
    
    # Testa em paralelo (máximo 50 proxies)
    test_proxies = random.sample(all_proxies, min(max_tests, len(all_proxies)))
    working_proxies = []
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(test_proxy, proxy): proxy for proxy in test_proxies}
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            if result:
                proxy_url, speed = result
                working_proxies.append((proxy_url, speed))
                if len(working_proxies) >= 3:  # Encontrou 3 bons, já pode parar
                    break
    
    if working_proxies:
        # Retorna o proxy mais rápido encontrado
        working_proxies.sort(key=lambda x: x[1])
        return working_proxies[0][0]
    
    return None

if __name__ == "__main__":
    try:
        proxy = get_fast_proxy()
        if proxy:
            # Saída formatada para o PHP (apenas o proxy)
            print(proxy)
        else:
            # Saída vazia se não encontrar
            print("")
    except Exception as e:
        # Em caso de erro, saída vazia
        print("")