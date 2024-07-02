FROM alpine:latest

WORKDIR /app 

COPY . .

RUN apk add --no-cache python3 py3-pip;\
    pip install -r requirements.txt --break-system-packages; 
    
CMD ["python","manage.py","runserver","0.0.0.0:8000"]