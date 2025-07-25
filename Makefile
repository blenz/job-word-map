NAME=job-word-map
INFRA_NAME=$(NAME)-infra

build-app:
	@docker build -t $(NAME) .

app:
	@docker run --rm -it --name $(NAME) \
		-w $(NAME) \
		-v $(PWD):$(NAME) \
		-p 3000:3000 \
		$(NAME)

sh:
	@docker exec -it $(NAME) sh

build-terraform:
	@docker build -t $(INFRA_NAME) infra

terraform:
	@docker run --rm -it --name $(INFRA_NAME) \
	-w /$(INFRA_NAME) \
	-v $(PWD)/infra:/$(INFRA_NAME) \
	-v ~/.aws:/root/.aws \
	$(INFRA_NAME)
