FROM hashicorp/terraform:1.8
RUN apk add --no-cache curl
RUN ln -s /bin/terraform /bin/tf
RUN echo 'ls -l $@' > /bin/ll && chmod +x /bin/ll
ENTRYPOINT [ "/bin/sh"]