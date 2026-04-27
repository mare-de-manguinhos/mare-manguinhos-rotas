import requests
import folium
import polyline
from geopy.geocoders import Nominatim

# 1. Configurar o geolocalizador (tradutor de endereço para coordenadas)
# O Nominatim é um serviço gratuito do OpenStreetMap.
geolocator = Nominatim(user_agent="meu_app_de_rotas")

# 2. Definir os endereços de Origem e Destino
endereco_origem = "praia de manguinhos , Serra, ES"
endereco_destino = "IFES, Serra, ES"

print(f"Buscando coordenadas para: {endereco_origem} e {endereco_destino}...")
origem = geolocator.geocode(endereco_origem)
destino = geolocator.geocode(endereco_destino)

# Verifica se os endereços foram encontrados
if origem and destino:
    # O OSRM exige as coordenadas na ordem: Longitude, Latitude
    lon1, lat1 = origem.longitude, origem.latitude
    lon2, lat2 = destino.longitude, destino.latitude
    
    print("Coordenadas encontradas! Calculando a rota no OSRM...")
    
    # 3. Fazer a requisição para a API pública do OSRM
    # Modo 'driving' (carro). A flag '?overview=full' garante que a rota venha detalhada
    url_osrm = f"http://router.project-osrm.org/route/v1/driving/{lon1},{lat1};{lon2},{lat2}?overview=full"
    
    resposta = requests.get(url_osrm)
    dados = resposta.json()

    # 4. Verificar se a rota foi calculada com sucesso
    if dados.get("code") == "Ok":
        
        # A rota vem codificada dentro do JSON na chave 'geometry'
        linha_codificada = dados['routes'][0]['geometry']
        
        # Decodificamos para uma lista de [Latitude, Longitude] usando a lib polyline
        coordenadas_rota = polyline.decode(linha_codificada)
        
        print("Rota calculada! Gerando o mapa interativo...")

        # 5. Criar o mapa base com Folium
        # Centralizamos o mapa na origem
        mapa = folium.Map(location=[lat1, lon1], zoom_start=12)

        # 6. Desenhar a linha da rota no mapa
        folium.PolyLine(
            locations=coordenadas_rota,
            color="#3388ff", # Azul padrão de mapas
            weight=5,
            opacity=0.8
        ).add_to(mapa)

        # 7. Adicionar marcadores visuais para Origem e Destino
        folium.Marker(
            [lat1, lon1], 
            popup="Origem", 
            icon=folium.Icon(color="green", icon="play")
        ).add_to(mapa)

        folium.Marker(
            [lat2, lon2], 
            popup="Destino", 
            icon=folium.Icon(color="red", icon="stop")
        ).add_to(mapa)

        # 8. Salvar o mapa em um arquivo HTML
        arquivo_saida = "rota_osrm.html"
        mapa.save(arquivo_saida)
        
        print(f"Sucesso! Abra o arquivo '{arquivo_saida}' no seu navegador para ver o resultado.")

    else:
        print("Erro: O OSRM não conseguiu traçar uma rota entre esses dois pontos.")
else:
    print("Erro: Não foi possível traduzir os endereços para coordenadas. Verifique a grafia.")