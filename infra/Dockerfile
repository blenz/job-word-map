FROM hashicorp/terraform:1.8
RUN ln -s /bin/terraform /bin/tf
RUN echo 'ls -l $@' > /bin/ll && chmod +x /bin/ll
ENTRYPOINT [ "/bin/sh"]