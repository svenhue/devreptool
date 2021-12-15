How to use the package in a workspace:
  
1) Install the package (extract `*.pkg` file into packages folder in your workspace or use `sencha package add *.pkg` if you have repository configured).

2) Configure your app.json. Set one of the provided themes (`bryntum-taskboard-theme-classic`) in the `theme` config and add `bryntum-taskboard` package to `requires` section:

	{
		"name" : "MyApp",
		"theme": "bryntum-taskboard-theme-triton",
		
		...
		
		"requires" : [
			"bryntum-taskboard"
		],
		
		...
	}
