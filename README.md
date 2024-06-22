# shatel_mobile_task
> :warning: **If you want to use Swagger UI Panel in backend App**: Please read the warning at the end of this .readme file!! There is a small change that you should to do in the development environment you'll install!

## Structure of the project
This project has two main subfolders: frontend and backend. as the names say, they are folders of the front and backend apps of this project.

## Setup Backend
first clone the repo

```sh
$ git clone https://github.com/mohammadnaderinasab01/shatel_mobile_task.git
```

then change directory to backend folder

```sh
$ cd backend
```

Create a virtual environment to install dependencies in and activate it:

```sh
$ python -m venv env
$ env/Scripts/activate
```

Then install the required dependencies from requirements.txt file:

```sh
(env)$ pip install -r requirements.txt
```

Once `pip` has finished downloading the dependencies:
```sh
(env)$ python manage.py runserver
```



## Setup Frontend
now let's move on the front side

for this, change directory to frontend folder

```sh
$ cd frontend
```

Then install all the required dependencies (do not forget to first, having nodejs into your machine):

```sh
$ npm install
```

and at the end, run the app:

```sh
$ npm start
```

> ## :warning: Important Warning!!!
because of some issue with drf_spectacular and SimpleJWTTokenUserScheme when customizing the swagger with my own authentication, you should change something in on of the files of your development env to saying to the swagger that we want to change the authentication target_class; **in the file: your-development-enviornment-name/Lib/site-packages/drf_spectacular/contrib/rest_framework_simplejwt.py**:

### change this segment of code:

first, import:
```sh
from authentication.authentication import UserAuthentication
```

then, from:

```sh
class SimpleJWTTokenUserScheme(SimpleJWTScheme):
    target_class = 'rest_framework_simplejwt.authentication.JWTTokenUserAuthentication'
```

to:

```sh
class SimpleJWTTokenUserScheme(SimpleJWTScheme):
    target_class = UserAuthentication
```
