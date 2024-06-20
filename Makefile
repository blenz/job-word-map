NAME=job-word-map

build:
	docker build -t $(NAME) .

run:
	docker run --rm -it --name $(NAME) -w /tmp/app -v $(PWD):/tmp/app -p 3000:3000 $(NAME)

sh:
	docker exec -it $(NAME) sh