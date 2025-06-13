# Enhanced Dashboard Integration Guide

## Overview

This document describes the integration of the AstroShield Enhanced Dashboard v1.1.0 with the infrastructure deployment system. The enhanced dashboard provides comprehensive system monitoring with real-time feature rollups and advanced analytics.

## Dashboard Endpoints

The enhanced dashboard integrates with the following API endpoints:

### New Dashboard API Endpoints (v1.1.0)

- **`GET /api/v1/dashboard/stats`** - Comprehensive dashboard statistics with feature rollups
- **`GET /api/v1/satellites`** - Satellite tracking data and status information  
- **`GET /api/v1/events`** - Recent system events and activities
- **`GET /api/v1/kafka/topics`** - Kafka topic information and health metrics
- **`POST /api/v1/kafka/publish`** - Message publishing to Kafka topics
- **`GET /health`** - System health check (existing)

### Dashboard Features

1. **System Metrics Overview**
   - System health percentage
   - Active tracks count
   - Critical alerts monitoring
   - API response time tracking

2. **Feature Rollups** (10+ AstroShield subsystems):
   - Satellite Tracking: 47 total, 45 operational, 2 threats
   - CCDM Analysis: 87.5% health, 5/8 indicators passing
   - Maneuvers: 5 scheduled, 156.3 m/s total ΔV
   - Analytics: 94.2% ML accuracy, 8 models running
   - Proximity Operations: 4 conjunctions, 180m closest approach
   - Event Correlation: 156 correlations found, 78.3% automation
   - Kafka Monitor: 25 topics, 34.7 msg/sec, 45ms latency
   - Protection: 12 threats blocked, HIGH readiness
   - Trajectory Analysis: 67 predictions, 97.8% accuracy
   - Stability Analysis: 42 stable, 5 unstable, 91.4% confidence

3. **Real-time Monitoring**
   - Auto-refresh every 30 seconds
   - Live system status updates
   - Recent activities feed
   - Interactive charts and visualizations

## Deployment Integration

### Current Production Setup

The enhanced dashboard is already deployed and operational at:
- **Production URL**: https://astroshield.sdataplab.com
- **Repository**: astroshield-production (updated ✅)
- **Frontend**: astroshield2-frontend (updated ✅)
- **Integration Package**: astroshield-integration-package v1.1.0 (updated ✅)

### Infrastructure Support

This infrastructure repository provides:

1. **Deployment Scripts** - Various deployment automation scripts
2. **Configuration Templates** - Docker, Nginx, and service configurations
3. **Monitoring Tools** - System health and performance monitoring
4. **ML Models** - Advanced analytics and prediction models
5. **Testing Frameworks** - Comprehensive testing for all components

### API Gateway Configuration

For deployments using this infrastructure, ensure the API gateway routes include:

```nginx
# Dashboard API endpoints
location /api/v1/dashboard/ {
    proxy_pass http://backend:8000/api/v1/dashboard/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /api/v1/satellites {
    proxy_pass http://backend:8000/api/v1/satellites;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

location /api/v1/events {
    proxy_pass http://backend:8000/api/v1/events;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}

location /api/v1/kafka/ {
    proxy_pass http://backend:8000/api/v1/kafka/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### Environment Variables

Add the following environment variables for enhanced dashboard support:

```bash
# Dashboard Configuration
DASHBOARD_REFRESH_INTERVAL=30000  # 30 seconds
ENABLE_FEATURE_ROLLUPS=true
ENABLE_REAL_TIME_UPDATES=true

# API Configuration  
API_BASE_URL=http://localhost:8000
DASHBOARD_API_TIMEOUT=5000

# Kafka Configuration for Dashboard
KAFKA_DASHBOARD_TOPICS=true
KAFKA_METRICS_ENABLED=true
```

## Monitoring Integration

The enhanced dashboard integrates with existing monitoring infrastructure:

### Prometheus Metrics

Dashboard endpoints expose metrics compatible with existing Prometheus configuration:

```yaml
- job_name: 'astroshield-dashboard'
  static_configs:
    - targets: ['backend:8000']
  metrics_path: '/api/v1/dashboard/stats'
  scrape_interval: 30s
```

### Health Checks

Docker Compose health check integration:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 15s
```

## Development and Testing

### Local Development Setup

For local development with the enhanced dashboard:

1. Clone the production repository with enhanced dashboard
2. Use the infrastructure deployment scripts as needed
3. Access dashboard at http://localhost:3000 (frontend) with API at http://localhost:8000

### Testing Dashboard Endpoints

Use the Python client in the integration package:

```bash
cd astroshield-integration-package
python examples/python/dashboard_client.py
```

## Migration from Legacy Dashboard

If migrating from older dashboard versions:

1. **Backup existing configurations**
2. **Update API endpoints** to use new `/api/v1/dashboard/stats` format
3. **Update frontend components** to use enhanced feature rollups
4. **Test all integrations** with new endpoint schemas
5. **Update monitoring dashboards** to use new metrics format

## Troubleshooting

### Common Issues

1. **Dashboard not loading**: Check `/health` endpoint first
2. **Missing feature data**: Verify backend API connectivity
3. **Slow performance**: Check `DASHBOARD_REFRESH_INTERVAL` setting
4. **Authentication errors**: Verify API keys and JWT tokens

### Debug Commands

```bash
# Test dashboard endpoints
curl http://localhost:8000/health
curl http://localhost:8000/api/v1/dashboard/stats
curl http://localhost:8000/api/v1/satellites
curl http://localhost:8000/api/v1/events

# Check service status
docker ps
docker logs <container_name>
```

## Security Considerations

- All dashboard endpoints require proper authentication
- API keys should be rotated regularly
- Use HTTPS in production environments
- Implement proper CORS policies
- Monitor for unauthorized access attempts

## Performance Optimization

- Enable caching for frequently accessed metrics
- Use connection pooling for database connections
- Implement rate limiting for API endpoints
- Monitor memory usage during real-time updates
- Optimize queries for large datasets

## Support and Documentation

For additional support:
- **Integration Package**: See `astroshield-integration-package` repository
- **API Documentation**: OpenAPI specification included
- **Python Examples**: Complete client implementation available
- **Production Setup**: Reference `astroshield-production` repository

## Version History

- **v1.1.0** (2025-06-12): Enhanced dashboard with feature rollups
- **v1.0.0** (2024-03-12): Initial dashboard implementation

---

**Note**: This infrastructure repository provides foundational deployment and configuration support. The primary enhanced dashboard implementation is in the `astroshield-production` repository and is already deployed and operational.