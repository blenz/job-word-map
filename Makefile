APP_NAME=job-word-map
TERRAFORM_NAME=$(APP_NAME)-terraform

WORKDIR=/tmp/dev

build-app:
	@docker build -t $(APP_NAME) .

app:
	@docker run --rm -it --name $(APP_NAME) \
		-w $(WORKDIR) \
		-v $(PWD):$(WORKDIR) \
		-p 3000:3000 \
		$(APP_NAME)

sh:
	@docker exec -it $(APP_NAME) sh

build-terraform:
	@docker build -t $(TERRAFORM_NAME) infra

terraform:
	@docker run --rm -it --name $(TERRAFORM_NAME) \
	-w $(WORKDIR) \
	-v ~/.aws:/root/.aws \
	-v $(PWD)/infra:$(WORKDIR) \
	--env-file $(PWD)/.env.local \
	$(TERRAFORM_NAME)