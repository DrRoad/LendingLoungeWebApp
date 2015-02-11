from flask import render_template
from flask import request
from flask import jsonify
from app import app
import pymysql as mdb
import os
from time import strftime, strptime, gmtime
import numpy as np
import json
import logging

#set up logging
logging.basicConfig(filename='events.log', level=logging.INFO)


with open('credentials.json') as credentials_file:
	credentials = json.load(credentials_file)

passwd = credentials['mysql']['password']
db = mdb.connect(host='127.0.0.1', port=3306, user='root', passwd=passwd, db='insight', autocommit=True)

with db:
		cur = db.cursor()
		cur.execute("SELECT * from listed_loans;")
		query_results = cur.fetchall()
loans = []
index_counter = 0
for i, result in enumerate(query_results):
	#only keep 36 month terms
	if result[3] == 36:
		index_counter += 1
		loans.append({'index': index_counter,
					  'asOfDate':result[0],
					  'id':result[1], 
					  'memberId': result[2],
					  'term':result[3],
					  'intRate':result[4],
					  'defaultProb': result[5],
					  'serviceFeeRate':result[6],
					  'installment':result[7],
					  'grade': result[8],
					  'subgrade':result[9],
					  'empLength':result[10],
					  'homeOwnership':result[11],
					  'annualInc': result[12],
					  'isIncV':result[13],
					  'acceptD':result[14],
					  'expD':result[15],
					  'listD':result[16],
					  'creditPullD':result[17],
					  'reviewStatusD':result[18],
					  'reviewStatus':result[19],
					  'description':result[20],
					  'purpose':result[21],
					  'addrZip':result[22],
					  'addrState': result[23],
					  'investorCount':result[24],
					  'ilExpD':result[25],
					  'initialListStatus':result[26],
					  'occupation': result[27],
					  'accNowDelinq':result[28],
					  'dti': result[32],
					  'delinq2Yrs':result[33],
					  'delinqAmnt':result[34],
					  'earliestCrLine':result[35],
					  'ficoRangeLow':result[36],
					  'ficoRangeHigh':result[37],
					  'inqLast6Mths':result[38],
					  'mthsSinceLastDelinq':result[39],
					  'mthsSinceLastRecord':result[40],
					  'openAccts': result[45],
					  'pubRec':result[46],
					  'revolBal': result[48],
					  'revolUtil': result[49],
					  'totalAcc':result[51],
					  'collections12MthsExMed':result[58],
					  'mthsSinceLastMajorDerog':result[60],
					  'loanAmnt':result[82],
					  'pred_default_time':result[86],
					  'pred_default':result[87],
					  'pred_paid':result[88],
					  'pred_roi':result[89],
					  'pred_default_time_error':result[90],
					  'pred_default_error':result[91],
					  'pred_roi_error':result[92],
					  'pred_prepaid':result[93],
					  'pred_prepaid_error':result[94]})
#aggregate values
mean_roi = 0
mean_default_prob = 0
mean_prepaid_prob = 0
mean_loan_amount = 0
mean_int_rate = 0
for i, loan in enumerate(loans):
	mean_roi += loan['pred_roi']
	mean_default_prob += loan['pred_default']
	mean_prepaid_prob += loan['pred_prepaid']
	mean_loan_amount += loan['loanAmnt']
	mean_int_rate += loan['intRate']
	if loan['pred_paid'] > 0.5:
		loans[i]['pred_default_time'] = '-'
		loans[i]['pred_default_time_error'] = '-'
	#format predictions -- MOVE THIS TO THE PREDICTION CODE
	try:
		loans[i]['pred_default'] = "%.2f" %float(loans[i]['pred_default'])
	except ValueError:
		pass
	try:
		loans[i]['pred_prepaid'] = "%.2f" %float(loans[i]['pred_prepaid'])
	except ValueError:
		pass
	try:
		loans[i]['pred_default_time_error'] = "%i" %float(loans[i]['pred_default_time_error'])
	except ValueError:
		pass
	try:
		loans[i]['pred_default_error'] = "%.2f" %float(loans[i]['pred_default_error'])
	except ValueError:
		pass
	try:
		loans[i]['pred_roi'] = "%.2f" %(float(loans[i]['pred_roi'])*100.0)
	except ValueError:
		pass
	#format dates
	for col in ['asOfDate', 'acceptD', 'expD', 'listD', 'creditPullD', 
				'reviewStatusD', 'ilExpD', 'earliestCrLine']:
		try:
			loans[i][col] = strptime(loans[i][col], "%Y-%m-%dT%H:%M:%S.")
			loans[i][col] = strftime("%d %b %Y", loans[i][col])
		except ValueError:
			pass
	loan['addrState'] = loan['addrState'].strip()
mean_roi = mean_roi / len(loans)
mean_default_prob = mean_default_prob / len(loans)
mean_prepaid_prob = mean_prepaid_prob / len(loans)
mean_loan_amount = mean_loan_amount / len(loans)
mean_int_rate = mean_int_rate / len(loans)


@app.route('/')
@app.route('/index')
def index():
	#logging
	logging.info('index')
	logging.info('! /index ' + request.remote_addr + strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	return render_template("index.html", loans=loans)

@app.route('/loans')
def show_loans():
	#logging
	logging.info('! /loans ', request.remote_addr, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	return render_template("loans.html",
				loans=loans,
				mean_roi=mean_roi,
				mean_default_prob=mean_default_prob,
				mean_prepaid_prob=mean_prepaid_prob,
				mean_loan_amount=mean_loan_amount,
				mean_int_rate=mean_int_rate)

@app.route('/presentation')
def presentation():
	#logging
	logging.info('! /presentation ', request.remote_addr, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	return render_template("presentation.html")

@app.route('/data_story')
def data_story():
	#logging
	logging.info('! /data_story ', request.remote_addr, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	return render_template("data_story.html")
#AJAX functions

#return all default probabilities
@app.route('/loan_recommendation')
def loan_recommendation():
	#logging
	logging.info('!AJAX /loan_recommendations ', request.remote_addr, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	grade = request.args.get('grade', 'A', type=str)
	prev_loan_id = request.args.get('prev_loan_id', 0, type=int)
	
	loans_sorted_roi = sorted(loans, key=lambda k: -float(k['pred_roi']))
	loans_sorted_roi = [x for x in loans_sorted_roi if x['grade'] == grade]

	best_loan = loans_sorted_roi[0]
	if prev_loan_id != 0:
		#loop through loans and take the next one in sequence
		for i in range(len(loans_sorted_roi)):
			if loans_sorted_roi[i]['id'] == prev_loan_id:
				best_loan = loans_sorted_roi[i+1]

	return jsonify(loan=best_loan)
	



@app.route('/roi')
def get_roi():
	#logging
	logging.info('!AJAX /roi ', request.remote_addr, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	roi = []
	default_prob = []
	loan_id = []
	for loan in loans:
		roi.append(loan['pred_roi'])
		default_prob.append(loan['pred_default'])
		loan_id.append(loan['id'])
		
	return jsonify(roi=roi,
				   default_prob=default_prob, 
				   loan_id=loan_id)

#return fields for one loan
@app.route('/loan')
def get_loan():
	#logging
	logging.info('!AJAX /loan ', request.remote_addr, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	loanId = request.args.get('loanId', 0, type=int)
	for loan in loans:
		if loan['id'] == loanId:
			return jsonify(loan=loan)
	return jsonify()

@app.route('/loans-filtered')
def get_loans_filtered():
	#logging
	logging.debug('!AJAX /loans_filtered ', request.remote_addr, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
	#grade = request.args.get('grade', 0, type=int)
	int_rate_min = request.args.get('int_rate_min', 0, type=float)
	int_rate_max = request.args.get('int_rate_max', 0, type=float)
	est_default_min = request.args.get('est_default_min', 0, type=float)
	est_default_max = request.args.get('est_default_max', 0, type=float)
	est_default_min, est_default_max = est_default_min/100.0, est_default_max/100.0
	#array to return
	loans_to_show = []
	for loan in loans:
		intRate = float(loan['intRate'])
		predDefault = float(loan['pred_default'])
		if intRate >= int_rate_min and intRate <= int_rate_max:
			if predDefault >= est_default_min and predDefault <= est_default_max:
				loans_to_show.append(loan)
	return jsonify(loans = loans_to_show)
