# FlexDC_Akvorado
07.10.2025
FlexDC.ru

---

## ⚙️ Состав Docker-окружения

| Компонент | Назначение |
|------------|------------|
| **akvorado-collector** | Получает NetFlow/sFlow/IPFIX |
| **akvorado-ingestor** | Обрабатывает и сохраняет данные |
| **akvorado-web** | Веб-интерфейс мониторинга |
| **clickhouse** | Хранилище данных потоков |
| **grafana** | Визуализация метрик и отчётов |
| **prometheus** | Мониторинг контейнеров |
| **loki** *(опционально)* | Логирование контейнеров |

---

## 🚦 Быстрый старт

```bash
git clone git@github.com:AlexanderGalchenko/FlexDC_Akvorado.git
cd FlexDC_Akvorado
cp .env.example .env
docker compose up -d
