from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from  rest_framework.authentication import BasicAuthentication,SessionAuthentication
from rest_framework.permissions import IsAuthenticated


class Home(APIView):
    def get(self, request):
        return Response({"success": True, "message": "Welcome to the Home API!"})


class Login(APIView):
    authentication_classes = [BasicAuthentication,SessionAuthentication]
    
    def post(self, request):
        try:
            print(request.data)
            username = request.data.get('username')
            password = request.data.get('password')

            # Authenticate user
            user = authenticate(username=username, password=password)
            if user is None:
                return Response({"success":False,"message":"Invalid Username or Password"},status=401)
            

            if user is None:
                return Response(
                    {"success": False, "message": "Invalid email or password"},
                    status=400,
                )
            else:
                login(request, user)
                return Response(
                    {"success": True, "message": "Login successful","user":user.first_name,"user_type":user.user_type},
                    status=200,
                )
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)


class Logout(APIView):
    def post(self, request):
        try:
            logout(request)
            return Response(
                {"success": True, "message": "Logout successful"},
                status=200,
            )
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)


class ForgetPassword(APIView):
    def post(self, request):
        
        return Response(
            {"success": False, "message": "Feature not implemented yet."},
            status=501,
        )
