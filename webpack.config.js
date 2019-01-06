const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),			// Относительный путь к соурс

	entry: {											// Путь к js
		main: './app.js',
		vendor: ['react', 'react-dom', 'jquery', 'popper.js', 'bootstrap']					//Библиотеки по всему сайту
	},            					

	output: {                          					// Путь к итоговым файлам
		filename: '[name].js',							// Название итогового файла хэш [chunkhash]
		path: path.resolve(__dirname, 'public') 		// Путь к итоговым файлам
	},

	devServer: {
		port: 8080,
		contentBase: path.resolve(__dirname, 'public')
	},

	//mode: 'development',								// Установка режима

	watch: true,										// Автообновление файлов

	//devtool: 'source-map',								// Где смотреть ошибки "Карты"

	module: {
		rules: [
			{											// Трансформ. js в поддержю версию
				test: /\.jsx?$/,							// Все js файлы
				exclude: /node_modules/,				// Какие файлы исключаем
				use: {
					loader: 'babel-loader',				// Что трансформит
					options: {
						presets: ['env', 'stage-0', 'react']
					}
				}				
			},
			{											// Трансформ. css в поддержю версию
				test: /\.scss$/,						// Все css файлы
				use: ExtractTextPlugin.extract({		// Загрузка стилей в отдельный файл
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
			{											// Трансформ. img
				test: /\.(jpe?g|png|gif|svg)$/,			// Все img файлы
				use: {
					loader: 'url-loader',				// Что трансформит
					options: {
						limit: 8000,					// Лимит на загрузку файлов в base64
						name: '[path][name].[ext]'		// Указываем название и путь img 
						//outputPath: 'img/'				// Путь img
					}
				}
			}
		]
	},
	plugins: [											// Загрузка css отдельным файлом
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new ExtractTextPlugin('styles.css')				// Название стилей
	],

	resolve: {
		extensions: ['.js', '.json', '.jsx', '*']
	}
};