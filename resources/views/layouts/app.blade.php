<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="/css/app.css" rel="stylesheet">
    <link href="/css/toolbox.css" rel="stylesheet">
    <link href="/css/pannel.css" rel="stylesheet">
    <link href="/css/optionBar.css" rel="stylesheet">
    <link href="/css/customBar.css" rel="stylesheet">
    <link rel='stylesheet' href='/js/spectrum/spectrum.css' />
    <link href="/css/grid.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
   
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @if (Auth::guest())
                            <li><a href="{{ url('/login') }}">Login</a></li>
                            <li><a href="{{ url('/register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ url('/logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>
        @yield('content')
    </div>
    @include('partial.footer')
     <!-- Scripts -->
    <script src="/js/app.js"></script>
    <!-- class -->
    <script src="/js/class/ToolBox.js"></script>
    <script src="/js/class/Shape.js"></script>
    <script src="/js/class/Text.js"></script>
    <script src="/js/class/Edit.js"></script>
    <script src="/js/class/Link.js"></script>
    <script src="/js/class/Text_link.js"></script>
    <script src="/js/class/Remove.js"></script>
    <script src="/js/class/Square.js"></script>
    <script src="/js/class/Round.js"></script>
    <script src="/js/class/Write.js"></script>
    <script src="/js/class/Trait.js"></script>
    <script src="/js/class/Spot.js"></script>
    <script src="/js/class/Hotspot.js"></script>
    <script src="/js/class/Export.js"></script>
     <script src="/js/class/Snipet.js"></script>
     <script src="/js/class/Grid.js"></script>
     <script src="/js/class/Paraph.js"></script>

     <script src="/js/class/Html.js"></script>
    <!-- Scripts -->
    <script src="/js/main.js"></script>
    <script src="/js/toolBox.js"></script>
    <script src="/js/protoBox.js"></script>
    <script src="/js/node_modules/clipboard/dist/clipboard.min.js"></script>
    <script>
        app.init();
    </script>
    @yield('script')

</body>
</html>