How to use the package in a workspace:
  
1) Install the package (extract `*.pkg` file into packages folder in your workspace or use `sencha package add *.pkg` if you have repository configured).

2) Configure your app.json. Set one of the provided themes (`bryntum-scheduler-theme-classic`, `bryntum-scheduler-theme-crisp`, `bryntum-scheduler-theme-neptune`, `bryntum-scheduler-theme-triton`, `bryntum-scheduler-theme-graphite`, `bryntum-scheduler-theme-material`) in the `theme` config and add `bryntum-scheduler` package to `requires` section:

	{
		"name" : "MyApp",
		"theme": "bryntum-scheduler-theme-triton",
		
		...
		
		"requires" : [
			"bryntum-scheduler"
		],
		
		...
	}
