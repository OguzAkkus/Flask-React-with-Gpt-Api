FROM python:3.9.16-slim
WORKDIR /server
COPY requirement.txt .
RUN pip install -r requirement.txt
COPY server.py .
CMD ["python", "./server.py"]
